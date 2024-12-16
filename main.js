const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,  // Ширина экрана устройства
    height: window.innerHeight, // Высота экрана устройства
    backgroundColor: '#f4f4f4',
    scale: {
        mode: Phaser.Scale.FIT,  // Масштабируем игру, чтобы она полностью помещалась
        autoCenter: Phaser.Scale.CENTER_BOTH // Центруем игру
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


const game = new Phaser.Game(config);

let score = 0;
let energy = 500;
let energyText;
let scoreText;
let lastUpdateTime = 0;

// Energy settings
const ENERGY_MAX = 500;
const ENERGY_COST = 10;
const ENERGY_REGEN_RATE = 1000; // Regeneration rate in ms

function preload() {
    // Load any assets here if needed
}

function create() {
    const isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS;

    // Score text
    scoreText = this.add.text(this.scale.width / 2, this.scale.height / 4, `Score: ${score}`, {
        fontSize: '32px',
        color: '#333',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Energy text
    energyText = this.add.text(this.scale.width / 2, this.scale.height / 3, `Energy: ${energy}`, {
        fontSize: '32px',
        color: '#007bff',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    const tapButton = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Tap!', {
        fontSize: '60px',  // Увеличиваем размер текста
        color: '#fff',
        backgroundColor: '#007bff',
        padding: { x: 30, y: 20 },  // Увеличиваем отступы
        fontFamily: 'Arial'
    })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            handleTap();
            tapButton.setStyle({ backgroundColor: '#0056b3' }); // Меняем цвет при нажатии
        })
        .on('pointerup', () => {
            tapButton.setStyle({ backgroundColor: '#007bff' }); // Возвращаем цвет
        });

    // Touchscreen hint (optional)
    if (isMobile) {
        this.add.text(this.scale.width / 2, this.scale.height - 50, 'Tap the button to gain points!', {
            fontSize: '20px',
            color: '#666',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
}


function update(time) {
    // Regenerate energy over time
    if (time - lastUpdateTime > ENERGY_REGEN_RATE) {
        if (energy < ENERGY_MAX) {
            energy++;
            energyText.setText(`Energy: ${energy}`);
        }
        lastUpdateTime = time;
    }
}

function handleTap() {
    if (energy >= ENERGY_COST) {
        score++;
        energy -= ENERGY_COST;

        // Update UI texts
        scoreText.setText(`Score: ${score}`);
        energyText.setText(`Energy: ${energy}`);
    } else {
        console.log('Not enough energy!');
    }
}
