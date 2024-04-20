export function getDate() {
    return new Date();
  }
  
  export function getFormattedDate(date) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  
  export function getCookieExpiryDate() {
    let currentDate = getDate();
    return new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  }
  
  export function getFormatDateTime(dateString) {
    const date = new Date(dateString);
  
    const optionsDate = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    
    const optionsTime = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
    
    return `${formattedDate} at ${formattedTime}`;
  }