function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('logged') === 'true'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('logged') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return isAuthenticated;
}
