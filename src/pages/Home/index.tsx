import React from 'react';
import { FiLogIn } from 'react-icons/fi'
import './style.css';
import Header from '../../components/Header/index';
import { Link } from 'react-router-dom';


import annotation from '../../assets/undraw_annotation_7das.svg';

const Home = () => {
    return (
        <>
            
            <div id="home-page">
                <Header title="letsgo"/>
                <main className="content-main">
                    <div className="content-main-card">
                        <h1>About</h1>
                        <p>klfdjaçklfj djkfajçlfk askjfklasjfdk jdfklajfk klsfdjklj jkfjasdklfj fkjasjfkl ksajfklj sldkjflkaj lskjfklaj saldfj ajsdkljf lkajsfd... </p>
                    </div>
                    <div className="content-main-card">
                        <h1>About</h1>
                        <p>klfdjaçklfj djkfajçlfk askjfklasjfdk jdfklajfk klsfdjklj jkfjasdklfj fkjasjfkl ksajfklj sldkjflkaj lskjfklaj saldfj ajsdkljf lkajsfd... </p>
                        
                    </div>
                    <Link className="button" to="/create-point">
                        <span className="icon">
                            <FiLogIn/>
                        </span>
                        <span className="press">
                            Press
                        </span>
                    </Link>
                    
                    
                </main>
                <aside className="content-right">
                    <div className="text-right">
                        <h1>About</h1>
                    </div>
                    <div>
                        <img src={annotation} alt="annotation-image"/>
                    </div>
                    <div className="text-right">
                        <h1>About</h1>
                        <p>klfdjaçklfj djkfajçlfk askjfklasjfdk jdfklajfk klsfdjklj jkfjasdklfj fkjasjfkl ksajfklj sldkjflkaj lskjfklaj saldfj ajsdkljf lkajsfd... </p>
                    </div>
                </aside>
                <svg  xmlns="http://www.w3.org/2000/svg" className="flex-wave" viewBox="0 0 1440 320">
                    <path fill="#002" fill-opacity="1" d="M0,96L9.2,122.7C18.5,149,37,203,55,202.7C73.8,203,92,149,111,106.7C129.2,64,148,32,166,37.3C184.6,43,203,85,222,101.3C240,117,258,107,277,128C295.4,149,314,203,332,192C350.8,181,369,107,388,90.7C406.2,75,425,117,443,122.7C461.5,128,480,96,498,74.7C516.9,53,535,43,554,69.3C572.3,96,591,160,609,160C627.7,160,646,96,665,85.3C683.1,75,702,117,720,117.3C738.5,117,757,75,775,90.7C793.8,107,812,181,831,192C849.2,203,868,149,886,138.7C904.6,128,923,160,942,186.7C960,213,978,235,997,240C1015.4,245,1034,235,1052,208C1070.8,181,1089,139,1108,133.3C1126.2,128,1145,160,1163,154.7C1181.5,149,1200,107,1218,96C1236.9,85,1255,107,1274,112C1292.3,117,1311,107,1329,106.7C1347.7,107,1366,117,1385,144C1403.1,171,1422,213,1431,234.7L1440,256L1440,0L1430.8,0C1421.5,0,1403,0,1385,0C1366.2,0,1348,0,1329,0C1310.8,0,1292,0,1274,0C1255.4,0,1237,0,1218,0C1200,0,1182,0,1163,0C1144.6,0,1126,0,1108,0C1089.2,0,1071,0,1052,0C1033.8,0,1015,0,997,0C978.5,0,960,0,942,0C923.1,0,905,0,886,0C867.7,0,849,0,831,0C812.3,0,794,0,775,0C756.9,0,738,0,720,0C701.5,0,683,0,665,0C646.2,0,628,0,609,0C590.8,0,572,0,554,0C535.4,0,517,0,498,0C480,0,462,0,443,0C424.6,0,406,0,388,0C369.2,0,351,0,332,0C313.8,0,295,0,277,0C258.5,0,240,0,222,0C203.1,0,185,0,166,0C147.7,0,129,0,111,0C92.3,0,74,0,55,0C36.9,0,18,0,9,0L0,0Z"></path>
                </svg>
            </div>
        </>
    );
}
export default Home;