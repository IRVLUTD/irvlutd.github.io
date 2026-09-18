const parameterHeaders = [
    'Model',
    'ACT',
    'DiT-D',
    'DiT-F',
    'SmolVLA',
    'X-VLA',
    '&pi;<sub>0</sub>',
    '&pi;<sub>0.5</sub>',
    'MolmoAct2-SO100_101',
    'GR00T1.7'
];

const parameterRows = [
    { name: 'Training type', values: ['From scratch', 'From scratch', 'From scratch', 'Fine-tuning', 'Fine-tuning', 'Fine-tuning', 'Fine-tuning', 'Fine-tuning', 'Fine-tuning'] },
    { name: 'Dataset size', values: ['500 demos', '500 demos', '500 demos', '500 demos', '500 demos', '500 demos', '500 demos', '500 demos', '500 demos'] },
    { name: 'Batch size', values: ['128', '128', '128', '128', '128', '16', '16', '16', '32'] },
    { name: 'Training steps', values: ['40K', '40K', '40K', '40K', '40K', '40K', '40K', '40K', '40K'] },
    { name: 'GPUs', values: ['2', '1', '1', '4', '4', '1', '1', '4', '4'] },
    { name: 'GPU type', values: ['A6000 Ada', 'H200', 'H200', 'A6000 Ada', 'A6000 Ada', 'H200', 'H200', 'A6000 Ada', 'A6000 Ada'] },
    { name: 'Action chunk size', values: ['32', '32', '32', '32', '32', '32', '32', '32', '32'] },
    { name: 'Number of action steps', values: ['32', '24', '24', '32', '32', '32', '32', '32', '32'] },
    { name: 'Vision encoder', values: ['Default', 'Default', 'Default', 'Default', 'Trainable', 'Frozen', 'Default', 'Default', 'Default'] },
    { name: 'Implementation', values: ['LeRobot', 'LeRobot', 'LeRobot', 'LeRobot', 'LeRobot', 'LeRobot', 'LeRobot', 'LeRobot', 'LeRobot'] },
    { name: 'Learning Rate', values: ['Default', 'Default', 'Default', 'Default', 'Default', 'Default', 'Default', 'Default', 'Default'] }
];

function renderParameterTable() {
    const tableContainer = document.getElementById('parameter-table-container');
    if (!tableContainer) return;

    let html = `
        <table class="table is-fullwidth is-striped is-bordered leaderboard-table">
            <thead>
                <tr>
                    ${parameterHeaders.map(h => `<th class="has-text-left">${h}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${parameterRows.map(row => `
                    <tr>
                        <td class="param-name has-text-left"><strong>${row.name}</strong></td>
                        ${row.values.map(val => `<td class="has-text-left">${val}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    tableContainer.innerHTML = html;
}

// Safely execute regardless of load state
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderParameterTable);
} else {
    renderParameterTable();
}