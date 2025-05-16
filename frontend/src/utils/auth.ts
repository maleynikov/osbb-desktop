const header = () => {
  const ssid = window.localStorage.getItem('ssid');

  if (ssid?.length === 32) {
    return {
        Authorization: 'Bearer ' + ssid
    };
  }
}

export { header }
