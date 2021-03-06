import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import Navbar from './Navbar'
import Brosur from './Brosur';

const HomePage = loadable(() => import('../Home/HomePage'));
const PengumumanPage = loadable(() => import('../Pengumuman/PengumumanPage'));
const BeritaPage = loadable(() => import('../Berita/BeritaPage'));
const PrestasiPage = loadable(() => import('../Prestasi/PrestasiPage'));
const ArtikelPage =  loadable(() => import('../Artikel/ArtikelPage'));
const BacaBerita = loadable(() => import('../Base/BacaBerita'));
const Jajal = loadable(() => import('../Base/Jajal'));


const Root = () => {
    return(
        <Router>
            <Navbar/>
            <Brosur/>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/pengumuman" component={PengumumanPage} />
                <Route exact path="/berita" component={BeritaPage} />
                <Route exact path="/berita/:judul" component={BacaBerita} />
                <Route exact path="/pengumuman/:judul" component={BacaBerita} />
                <Route exact path="/kumpulan-prestasi" component={PrestasiPage} />
                <Route exact path="/:centerPath/:lastPath" component={ArtikelPage}/>
                <Route exact path="/jajal" component={Jajal}/>
            </Switch>
        </Router> 
    );
}

export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root/>, document.getElementById('root'));
}
