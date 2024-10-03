export const useLocalStorage = () => {
    const setItem = (key: string, value: any) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e: any) {
        console.log(e);
      }
    };
  
    const getItem = (key: string) => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          return JSON.parse(item);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return { setItem, getItem };
  };
  