"use client";

import Hamburger from "hamburger-react";
import Header from "../../UI/header";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Menu from "../../UI/menu";

export default function DashboardHeader() {
  const router = useRouter();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const handleCloseUserMenu = () => setIsUserDropdownOpen(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    if (!storedUser) {
      router.push('/');
    } else {
      setUser(storedUser);
    }
  }, [router]);

  const toggleDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleOptionClick = () => {
      localStorage.removeItem('user');
      router.push('/');
  };

  return (
    <Header color="darkBlue">
      <div className="flex items-center justify-between w-full sm:hidden">
        <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} color={'red'} />
      </div>

      <div className="flex items-center justify-around w-full relative">
        <div></div>
        {user && (
          <div className="flex items-center cursor-pointer relative" onClick={toggleDropdown}>
            <span className="mr-8 text-white text-xs font-semibold hidden sm:flex">{user.name}</span>
            <i className="fa-regular fa-circle-user text-red text-2xl"></i>
            <Menu isOpen={isUserDropdownOpen} onClose={handleCloseUserMenu} left={false}  textColor="green" backgroundColor="black" isMobile={false}
            items={[
              { name: 'Minha conta', link: '/dashboard/my-account' },
              { name: 'Configurações', link: '/dashboard/configurations' },
              { name: 'Sair', callBack: () => handleOptionClick()},
            ]} />
          </div>
        )}
        <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} items={[
          { name: 'Início', link: '/dashboard' },
          { name: 'Transferências', link: '/dashboard/transactions' },
          { name: 'Investimentos', link: '/dashboard/investments' },
          { name: 'Outros serviços', link: '/dashboard/other-services' },
        ]} />

      </div>
    </Header>
  );
}
