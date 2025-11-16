import {Geist} from "next/font/google";
import Hello from '@/components/hello';
import MovieAlbums from '@/components/home';



const Home = () => {
    return (
        <main>
            <div className="
                 text-5xl font-bold
                 underline
                 text-[#feeefe]
                 font-[Geist]
            ">
                Welcome to Nextjs
            </div>
            <Hello />
            <MovieAlbums />
        </main>
    )
}
export default Home
