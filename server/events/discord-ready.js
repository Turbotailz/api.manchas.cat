module.exports = (client) => {
  console.log('Logged in to Discord');
  console.log(`User: ${client.user.username}#${client.user.discriminator}`);
  console.log(`ID: ${client.user.id}`);
};
