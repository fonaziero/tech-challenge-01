import RedirectCard from "../card/redirect";
import SecondCardContainer from "../card/secondContainer";
import LoanIcon from "@/app/assets/Ícone empréstimo.png";
import CardIcon from "@/app/assets/Ícone cartões.png";
import DonationIcon from "@/app/assets/Ícone doações.png";
import PixIcon from "@/app/assets/Ícone Pix.png";
import InsuranceIcon from "@/app/assets/Ícone seguros.png";
import CellPhoneCreditIcon from "@/app/assets/Ícone Recarga.png";

export default function OtherServicesCard() {
  return (
    <SecondCardContainer>
      <div className="flex flex-col gap-5 h-full w-full">
        <h3 className="text-lg font-bold text-black">Confira os serviços disponíveis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          <RedirectCard icon={LoanIcon} title="Empréstimo" />
          <RedirectCard icon={CardIcon} title="Meus cartões" />
          <RedirectCard icon={DonationIcon} title="Doações" />
          <RedirectCard icon={PixIcon} title="Pix" />
          <RedirectCard icon={InsuranceIcon} title="Seguros" />
          <RedirectCard icon={CellPhoneCreditIcon} title="Crédito celular" />
        </div>
      </div>
    </SecondCardContainer>
  );
}
