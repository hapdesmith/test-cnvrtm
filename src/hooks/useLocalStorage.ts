const useLocalStorage = () => {
  const setLocalStorage = (key: string, value: unknown, expiry: number = 1): void => {
    try {
      const now = new Date();
      const expiryDate = new Date(now.getTime() + expiry * 24 * 60 * 60 * 1000); // Menghitung tanggal kadaluarsa dalam hari
      const item = {
        value: value,
        expiry: expiryDate.getTime()
      };
      // Mengubah value menjadi string JSON sebelum disimpan
      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('Error menyimpan ke localStorage:', error);
    }
  };

  const getLocalStorage = (key: string): unknown => {
    try {
      // Mengambil data dari localStorage dan mengubahnya kembali ke format asli
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      const parsedItem = JSON.parse(item);
      const now = new Date();

      // Memeriksa apakah item sudah kadaluarsa
      if (now.getTime() > parsedItem.expiry) {
        window.localStorage.removeItem(key);
        return null;
      }

      return parsedItem.value;
    } catch (error) {
      console.error('Error mengambil dari localStorage:', error);
      return null;
    }
  };

  const removeLocalStorage = (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error menghapus dari localStorage:', error);
    }
  };

  return {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
  };
};

export default useLocalStorage;
