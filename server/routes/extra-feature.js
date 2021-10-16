let axios = require('axios');
axios = axios.create({
  baseURL: 'http://localhost:3200/'
});
const pushNotification = async (notify) => {

  await axios.post("/notifications/add",{
      title : notify.title,
      type: notify.type,
      thumbnail: notify.thumbnail,
      iconclasses : notify.iconclasses || 'fas fa-question'
  }).catch(err=>{

  })
}

module.exports.pushNotification = pushNotification;
