import { usePortfolio } from '../context/PortfolioContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { isAdmin, setIsAdmin } = usePortfolio();

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdmin) {
      if (window.confirm('Are you sure you want to log out of Admin Mode?')) {
        setIsAdmin(false);
      }
    } else {
      const password = window.prompt('Enter Admin Password:');
      if (password === 'Binod0958') {
        setIsAdmin(true);
        alert('Admin Mode Enabled! You can now edit the portfolio.');
      } else if (password !== null) {
        alert('Incorrect password.');
      }
    }
  };

  return (
    <footer className="py-8 bg-card border-t border-border transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-card-foreground">
            © {currentYear} Binod Bishwakarma. All rights reserved.
          </p>
          <div className="text-sm text-card-foreground flex justify-end">
            <button
              onClick={handleAdminClick}
              className="opacity-20 hover:opacity-100 transition-opacity text-xs"
            >
              {isAdmin ? '(Admin Active - Logout)' : 'π'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
