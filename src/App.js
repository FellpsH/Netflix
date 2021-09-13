// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import Tmbd from './Tmbd';
import MovieRow from './components/MovieRow';
import './App.css'
import FeaturedMoive from './components/FeaturedMoive';
import Header from './components/Header';


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackheader, setBlackHeader] = useState(false);

  useEffect(()=> {
    const loadAll = async () =>{
      //Pegando a lista de todos os filmes
      let list = await Tmbd.getHomeList();
      setMovieList(list);

      //Pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let choseninfo = await Tmbd.getMovieinfo(chosen.id, 'tv');
      setFeaturedData(choseninfo);
    }

    loadAll();
  },[]);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } 
      else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    <div className="page">

      <Header black={blackheader}/>

      {featuredData &&
        < FeaturedMoive item={featuredData}/>
      }
      <section className="lists">
      {movieList.map((item,key)=>(
        <MovieRow key={key} title={item.title} items={item.items} />
      ))}
      </section>

      <footer>
        Feito por Fellipe Babeto <br/>
        Diretos de imagem da Netflix <br/>
        Dados pegados do site themoviedb.org <br/>
      </footer>
      

      {movieList.length <=0 &&
      <div className="load">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"  alt="Carregando"/>
      </div>
      }
    </div>
  );
}