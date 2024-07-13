
export const decodeHTMLEntities = (text) => {
   const parser = new DOMParser();
   const decodedString = parser.parseFromString(text, 'text/html').body.textContent;
   return decodedString;
};

export const shuffleArray = (arr) => {
   for (let i=arr.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
}