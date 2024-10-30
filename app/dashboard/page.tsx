import Header from "../components/dashboard/header/index";
import MainContent from "../components/dashboard/main";

export default function ServicesPage() {


    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen bg-lightGreen">
                <MainContent />
            </div>
        </>
    );
}
