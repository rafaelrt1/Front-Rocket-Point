import Footer from "./Footer";
import Header from "./Header";

export default function NotFound() {
    return (
        <>
            <Header />
            <div className="bg-not-found">
                <img alt="not-found" src="https://media.istockphoto.com/vectors/error-404-page-not-found-vector-id673101428?k=20&m=673101428&s=170667a&w=0&h=sifFCXQls5ygak3Y-II0cI1tibgQZVyPWzpLHtHKOGg="></img>
            </div>
            <Footer />
        </>
    )
}