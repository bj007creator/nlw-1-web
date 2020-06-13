import React, { useState, useEffect, ChangeEvent } from 'react';
import './style.css';

import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Header from '../../components/Header/index';
import hackerMindset from '../../assets/undraw_hacker_mindset_gjwq.svg';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

interface Item {
    id : number,
    image_url : string,
    title : string
}

interface IBGEUFResponse {
    sigla : string
}
interface IBGECityResponse {
    nome : string
}
interface FormDataModel{
    name : string,
    whatsapp : string,
    email : string
}

const CreatePoint = () => {
    const [itemState, setItemState] = useState("overlayer");
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    
    /*inputs*/
    const [formData, setFormData] = useState<FormDataModel>({
        email : '',
        name : '',
        whatsapp : ''
    });
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const history = useHistory();

    useEffect( () => {
        navigator.geolocation.getCurrentPosition( position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);
    
    useEffect( () => {
        api.get('items').then( response => {
            console.log(response.data);
            setItems(response.data);
        }).catch( err => {
            console.log(err);
        });
    }, []);

    useEffect( () => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then( response => {
            const ufInitials = response.data.map( uf => {
                return uf.sigla;
            });
            setUfs(ufInitials);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    useEffect( () => {
        if(selectedUf === '0'){
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then( response => {
            const cityNames = response.data.map( city =>{
                return city.nome;
            });
            setCities(cityNames);
        })
        .catch( err => {
            console.log(err);
        });
    }, [selectedUf]);
    function handleSelectUf(event : ChangeEvent<HTMLSelectElement>){
        setSelectedUf(event.target.value);
    }
    function handleSelectCity(event : ChangeEvent<HTMLSelectElement>){
        setSelectedCity(event.target.value);
    }
    function handleMapClick(event : LeafletMouseEvent){
        const { lat, lng } = event.latlng;
        setSelectedPosition([lat, lng]);
    }

    function handleInputChange(event : ChangeEvent<HTMLInputElement>){
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id] : value
        })
    }

    function handleSelectItem(id : number){
        const alreadySelected = selectedItems.findIndex(item => item === id);
        if(alreadySelected >= 0){
            const filteredItems = selectedItems.filter( item => {
                return item !== id;
            });
            setSelectedItems(filteredItems);
        }
        else{
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event : ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;
        

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }
        const response = await api.post("points", data);
        console.log(response);
        window.alert('Ponto de coleta criado');
        history.push('/');
    }

    return(
        <>
        <div id="createPointContainer">
            <Link className="go-back-room" to="/">
                <span className="icon-box">
                    <FiLogIn className="icon"/>
                </span>
                <span className="press">
                    Home
                </span>
            </Link>
            <Header title="letsgo"/>
            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <fieldset className="cadastro">
                        <legend>
                            <h2>Dados</h2>
                        </legend>
                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input 
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input 
                                    type="text"
                                    name="whatsapp"
                                    id="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="cadastro">
                        <legend>
                            <h2>Endereço</h2>
                            <span>Selecione um endereço no mapa</span>
                        </legend>

                        <Map 
                            className="map" 
                            length={4} 
                            center={initialPosition} 
                            zoom={15}
                            onClick={handleMapClick}
                        >
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={selectedPosition}/>
                        </Map>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado (UF)</label>
                                <select 
                                    name="uf"
                                    id="uf"
                                    value={selectedUf}
                                    onChange={handleSelectUf}>
                                        <option value="0">Selecione uma opção</option>
                                        {
                                            ufs.map( uf => (
                                                <option key={uf} value={uf}>{uf}</option>
                                            ) )
                                        }
                                </select>
                            </div>
                            

                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select 
                                    name="city"
                                    id="city"
                                    value={selectedCity}
                                    onChange={handleSelectCity}>
                                        <option value="0">Selecione uma opção</option>
                                        {
                                            cities.map( city => (
                                                <option key={city} value={city}>{city}</option>
                                            ) )
                                        }
                                </select>
                            </div>
                        </div>

                    </fieldset>

                    <fieldset className="cadastro">
                        <legend>
                            <h2>Itens de coleta</h2>
                            <span>Selecione itens para coleta abaixo</span>
                        </legend>
                        <ul className="items-grid">
                            {
                                items.map( item => (
                                    <li 
                                        key={ item.id }
                                        onClick={ () => handleSelectItem(item.id)}
                                    >
                                        <img className="img-icon" src={ item.image_url } alt={ item.title }/>
                                        <span>{ item.title }</span>
                                        <div className={
                                            selectedItems.includes(item.id) ? 
                                            "overlayer selected" :
                                            "overlayer"
                                        }>

                                        </div>
                                    </li>
                                ) )
                            }
                            

                            
                        </ul>

                    </fieldset>
                    <div className="submit-container">
                        <button className="submit" type="submit">
                            <div>
                                <span className="icon-cadastrar">
                                    <FiLogIn className="icn-cdst"/>
                                </span>
                                <span className="press-cadastrar">
                                    Cadastrar
                                </span>
                            </div>
                        </button>
                    </div>
                    
                </form>
            </main>
            <aside>
                <div className="hackerMindset-container">
                    <img src={hackerMindset} className="hackerMindset-image" alt="hackerMindset-image"/>
                </div>
            </aside>
            <svg  xmlns="http://www.w3.org/2000/svg" className="flex-wave" viewBox="0 0 1440 320">
                <path fill="#002" fillOpacity="1" d="M0,96L9.2,122.7C18.5,149,37,203,55,202.7C73.8,203,92,149,111,106.7C129.2,64,148,32,166,37.3C184.6,43,203,85,222,101.3C240,117,258,107,277,128C295.4,149,314,203,332,192C350.8,181,369,107,388,90.7C406.2,75,425,117,443,122.7C461.5,128,480,96,498,74.7C516.9,53,535,43,554,69.3C572.3,96,591,160,609,160C627.7,160,646,96,665,85.3C683.1,75,702,117,720,117.3C738.5,117,757,75,775,90.7C793.8,107,812,181,831,192C849.2,203,868,149,886,138.7C904.6,128,923,160,942,186.7C960,213,978,235,997,240C1015.4,245,1034,235,1052,208C1070.8,181,1089,139,1108,133.3C1126.2,128,1145,160,1163,154.7C1181.5,149,1200,107,1218,96C1236.9,85,1255,107,1274,112C1292.3,117,1311,107,1329,106.7C1347.7,107,1366,117,1385,144C1403.1,171,1422,213,1431,234.7L1440,256L1440,0L1430.8,0C1421.5,0,1403,0,1385,0C1366.2,0,1348,0,1329,0C1310.8,0,1292,0,1274,0C1255.4,0,1237,0,1218,0C1200,0,1182,0,1163,0C1144.6,0,1126,0,1108,0C1089.2,0,1071,0,1052,0C1033.8,0,1015,0,997,0C978.5,0,960,0,942,0C923.1,0,905,0,886,0C867.7,0,849,0,831,0C812.3,0,794,0,775,0C756.9,0,738,0,720,0C701.5,0,683,0,665,0C646.2,0,628,0,609,0C590.8,0,572,0,554,0C535.4,0,517,0,498,0C480,0,462,0,443,0C424.6,0,406,0,388,0C369.2,0,351,0,332,0C313.8,0,295,0,277,0C258.5,0,240,0,222,0C203.1,0,185,0,166,0C147.7,0,129,0,111,0C92.3,0,74,0,55,0C36.9,0,18,0,9,0L0,0Z"></path>
            </svg>

            
        </div>
        
            
            
        
        </>
    ); 
}
export default CreatePoint;