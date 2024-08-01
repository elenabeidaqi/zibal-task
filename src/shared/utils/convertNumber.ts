
export function ConvertToEnglishNumber(persianNumber: string) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
    return persianNumber
      .split('')
      .map((char) => {
        const index = persianDigits.indexOf(char);
        return index !== -1 ? index.toString() : char;
      })
      .join('');
  }
  

  export function formatPrice(price: string): string {
    const data = price.replaceAll(',', '');
  
    const validRegex = /[۰-۹0-9,.]+/g;
  
    if (!validRegex.test(data)) {
      return '';
    } else {
      const priceStr = data.toString().split('');
  
      let formattedPrice = '';
  
      for (let i = priceStr.length - 1, count = 0; i >= 0; i--) {
        formattedPrice = priceStr[i] + formattedPrice;
        count++;
        if (count === 3 && i !== 0) {
          formattedPrice = ',' + formattedPrice;
          count = 0;
        }
      }
  
      return formattedPrice;
    }
  }
  

export function ConvertNumber(text: string, separate?: boolean) {
    const validRegex = /[۰-۹0-9,+.-]+/g;
  
    const filteredText = text.replace(/[^۰-۹0-9,+.-]/g, '');
  
    if (validRegex.test(filteredText)) {
      let converted = filteredText;
  
      converted = ConvertToEnglishNumber(filteredText);
  
      if (separate) {
        return formatPrice(converted);
      } else {
        return converted;
      }
    } else {
      return '';
    }
  }
  