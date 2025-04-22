// index.js
const os = require('os');
const si = require('systeminformation'); // Biblioteca útil para mais detalhes

async function getSystemInfo() {
    try {
        // Informações do Sistema Operacional
        const osInfo = {
            platform: os.platform(),
            type: os.type(),
            release: os.release(),
            architecture: os.arch(),
            hostname: os.hostname(),
            uptime: formatUptime(os.uptime())
        };

        // Informações do Processador
        const cpuInfo = {
            manufacturer: 'Desconhecido',
            brand: 'Desconhecido',
            cores: os.cpus().length,
            speed: `${os.cpus()[0].speed} MHz`
        };

        // Usando systeminformation para dados mais detalhados
        const fullCpuInfo = await si.cpu();
        const memInfo = await si.mem();

        // Atualizando com informações mais precisas
        cpuInfo.manufacturer = fullCpuInfo.manufacturer;
        cpuInfo.brand = fullCpuInfo.brand;
        cpuInfo.speed = `${fullCpuInfo.speed} GHz`;

        // Informações de Memória
        const memory = {
            total: (memInfo.total / 1024 / 1024 / 1024).toFixed(2) + ' GB',
            free: (memInfo.free / 1024 / 1024 / 1024).toFixed(2) + ' GB'
        };

        return { osInfo, cpuInfo, memory };

    } catch (error) {
        console.error('Erro ao obter informações:', error);
    }
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
}

// Exibir as informações formatadas
async function displaySystemInfo() {
    const info = await getSystemInfo();
    
    console.log('\x1b[36m\x1b[1m=== Informações do Sistema ===\x1b[0m');
    console.log('\x1b[32mSistema Operacional:\x1b[0m');
    console.log(`- Plataforma: ${info.osInfo.platform}`);
    console.log(`- Tipo: ${info.osInfo.type}`);
    console.log(`- Versão: ${info.osInfo.release}`);
    console.log(`- Arquitetura: ${info.osInfo.architecture}`);
    console.log(`- Hostname: ${info.osInfo.hostname}`);
    console.log(`- Uptime: ${info.osInfo.uptime}`);

    console.log('\n\x1b[32mProcessador:\x1b[0m');
    console.log(`- Fabricante: ${info.cpuInfo.manufacturer}`);
    console.log(`- Modelo: ${info.cpuInfo.brand}`);
    console.log(`- Núcleos: ${info.cpuInfo.cores}`);
    console.log(`- Velocidade: ${info.cpuInfo.speed}`);

    console.log('\n\x1b[32mMemória:\x1b[0m');
    console.log(`- Total: ${info.memory.total}`);
    console.log(`- Livre: ${info.memory.free}`);
}

displaySystemInfo();