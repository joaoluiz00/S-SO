const os = require('os');

console.log('=== Informações do Sistema ===');
console.log('Plataforma:', os.platform());
console.log('Tipo:', os.type());
console.log('Versão:', os.release());
console.log('Arquitetura:', os.arch());
console.log('Hostname:', os.hostname());
console.log('Uptime:', `${(os.uptime() / 3600).toFixed(2)} horas`);

console.log('\n=== Informações do Processador ===');
console.log('Modelo:', os.cpus()[0].model);
console.log('Núcleos:', os.cpus().length);
console.log('Velocidade:', `${os.cpus()[0].speed} MHz`);

console.log('\n=== Informações de Memória ===');
console.log('Total:', `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log('Livre:', `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`);

console.log('\n=== Informações das Placas de Rede ===');
const networkInterfaces = os.networkInterfaces();
Object.keys(networkInterfaces).forEach(iface => {
    console.log(`Interface: ${iface}`);
    networkInterfaces[iface].forEach(addr => {
        if (addr.family === 'IPv4') console.log(`  IPv4: ${addr.address}`);
        if (addr.family === 'IPv6') console.log(`  IPv6: ${addr.address}`);
        console.log(`  MAC: ${addr.mac}`);
    });
});