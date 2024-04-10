import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Cards from "../components/Cards"
import Footer from "../components/Footer"
import { setAllCards } from "../redux/features/cardSlice"
import { useEffect } from "react";


const Home = () => {
    const dispatch = useDispatch();
    const { currentCards, searchField } = useSelector((state) => state.card);
    const [loading,setLoading] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await fetch(`${import.meta.env.VITE_SERVER}card/all`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const cardsData = await response.json();
                // console.log(cardsData)
                dispatch(setAllCards(cardsData));
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    }, [dispatch]);


    const filteredCards = currentCards.filter((cards) => {
        return cards.productName.toLowerCase().includes(searchField.toLowerCase());
    });
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="p-6">
                    <div className="flex flex-wrap gap-6 md:justify-stretch justify-center items-center">
                        {
                            loading ? (
                                [...Array(20)].map((_, i) => <div className="skeleton h-60 w-60 mb-4 mx-4 bg-stone-200" key={i} />)
                              ) :
                            filteredCards.map((card, i) => (
                                <Cards
                                    key={card._id}
                                    card={card}
                                    i={i} />
                            ))
                        }
                    </div>
                </div>
                <div className='w-full bg-[#2c3e50]'></div>
                <footer className="w-full min-h-10 h-auto rounded-sm bg-gradient-to-r from-[#000046] to-[#1CB5E0] text-white shadow-md">
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export default Home
