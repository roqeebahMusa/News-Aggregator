// import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
// import axios from 'axios'


const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

  h2 {
    font-size: 50px;
  }

  p {
    text-align: justify;
    width: 50%;
  }

  h3 {
    font-size: 30px;
  }

`

interface PropsData {
  content: string;
  title: string;
  description: string;
  image: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };


}

const Input = styled.input`
  width: 500px;
  height: 70px;
  padding-left: 20px;
`

const Card = styled.div`
  height: 250px;
  width: 300px;
  border: 1px solid gray;
  border-radius: 5px;
`

const CardHold = styled.div`
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const NewsCat = styled.div`
  font-size: 40px;
  font-weight: bold;
  display: flex;
  gap: 20px;
`

const NewsCard = styled.div`
  height: 150px;
  width: 300px;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NewsImage = styled.img`
  height: 120px;
  width: 100%;
  object-fit: cover;
`



function App() {

  const [NewsData, setNewsData] = useState([])

  // generated api key from gnews.io
  const apikey = '14115d7eea6143788382e6b957d4dc1d';

  // the url (location of where the apikey is coming from)
  const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${apikey}`;

  // if u want to call an api you must always declare a function
  // async - ability to be able to try and catch error in an api

  // get method accept one or two parameter and one of the parameter it takes is the (URL)

  // .THEN RETUNS SUCCESSFUL results -

  // useEffect make updates and changes

  const GetNewsQuery = async() => {

    try {

      await axios.get(url)
      .then((response) => {
        console.log(response?.data?.articles)
        setNewsData(response?.data?.articles)

      })
      .catch((err) => {
        console.log(err)
      });

    } catch(err){
       console.log(err)
    }
  }


  // the empty array in the useEffect block means that the result should run once
    useEffect(() => {
      GetNewsQuery()
    }, []);



  return (
      <Container>
        <h2>NEWS AGGREGATOR TCA</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, tempora doloremque. Exercitationem cum similique nobis, nesciunt perspiciatis pariatur tenetur corporis debitis optio, asperiores, alias excepturi quo voluptate minus natus iste?
        Exercitationem officia facilis minus molestias cupiditate omnis, dignissimos fugit, magni perferendis atque delectus dicta veniam optio nobis! At perferendis dicta, id praesentium saepe, ratione excepturi quae reprehenderit molestiae commodi quam.</p>

        <Input
        placeholder = "Search for News" />

        <button>Search</button>
        
        <h3>Our Diffferent News Source</h3>

        <NewsCat>
          <NewsCard>BBC</NewsCard>
          <NewsCard>GOGGLE</NewsCard>
          <NewsCard>BING</NewsCard> 
          <NewsCard>PUNCH</NewsCard>
        </NewsCat>
        <br />
        <br />
        <br />

        <h3>Current News Headlines</h3>

        <CardHold>
        
            {
              NewsData?.map((news: PropsData, i: number) => (
                <Card key={i}>
                <NewsImage src={news?.image} />
                <div>{news?.title}</div>
                <a href={news?.url}>
                  <div>Read More</div>
                </a>
              </Card>
              ))
            }
         
        </CardHold>
      </Container>
  )
}

export default App


