function parseLeaderboardValue(value) {
    return parseFloat(value) || 0;
}

function renderMethodLabel(method) {
    return `
        <span class="leaderboard-method-inner">
            <span class="leaderboard-method-name">${method.label}</span>
            <a href="#ref-${method.ref}" class="leaderboard-ref-link leaderboard-method-badge">
                <span class="leaderboard-ref-box">${method.ref}</span>
            </a>
        </span>
    `;
}

function renderLeaderboard(datasetKey, sortKey = 'average') {
    const tableHead = document.getElementById('leaderboard-head');
    const tableBody = document.getElementById('leaderboard-body');
    const dataset = leaderboardData[datasetKey];

    if (!tableHead || !tableBody || !dataset) {
        return;
    }

    const taskRows = dataset.groups.flatMap((group) => group.rows);
    const rankedMethods = leaderboardMethods.map((method, index) => ({
        method,
        average: dataset.average[index],
        values: taskRows.map((row) => row.values[index])
    })).sort((left, right) => {
        const leftValue = sortKey === 'average'
            ? parseLeaderboardValue(left.average)
            : parseLeaderboardValue(left.values[sortKey]);
        const rightValue = sortKey === 'average'
            ? parseLeaderboardValue(right.average)
            : parseLeaderboardValue(right.values[sortKey]);

        if (rightValue !== leftValue) {
            return rightValue - leftValue;
        }

        return parseLeaderboardValue(right.average) - parseLeaderboardValue(left.average);
    });

    tableHead.innerHTML = `
        <tr>
            <th>Rank</th>
            <th>Method</th>
            <th class="leaderboard-sortable-header ${sortKey === 'average' ? 'is-active' : ''}" data-sort-key="average">Average</th>
            ${taskRows.map((row, index) => `<th class="leaderboard-task-header leaderboard-sortable-header ${sortKey === index ? 'is-active' : ''}" data-sort-key="${index}">${row.task}</th>`).join('')}
        </tr>
    `;

    tableBody.innerHTML = rankedMethods.map((entry, index) => `
        <tr class="${index === 0 ? 'leaderboard-top-row' : ''}">
            <td class="leaderboard-rank-cell">${index + 1}</td>
            <td class="leaderboard-method-cell">${renderMethodLabel(entry.method)}</td>
            <td class="leaderboard-average-cell">${entry.average}</td>
            ${entry.values.map((value) => `<td>${value}</td>`).join('')}
        </tr>
    `).join('');

    tableHead.querySelectorAll('.leaderboard-sortable-header').forEach((header) => {
        header.addEventListener('click', function () {
            const nextSortKey = this.dataset.sortKey === 'average'
                ? 'average'
                : Number(this.dataset.sortKey);
            renderLeaderboard(datasetKey, nextSortKey);
        });
    });
}

function renderReferences() {
    const referencesSection = document.getElementById('references-section');
    const referencesList = document.getElementById('references');
    const items = Object.entries(references);

    if (!referencesSection || !referencesList) {
        return;
    }

    if (!items.length) {
        referencesSection.style.display = 'none';
        return;
    }

    referencesSection.style.display = '';
    referencesList.innerHTML = items.map(([key, value]) => (
        `<li id="ref-${key}" class="references">${value}</li>`
    )).join('');
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.dataset-pill');
    let activeDataset = 'id';

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            buttons.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
            activeDataset = this.dataset.dataset;
            renderLeaderboard(activeDataset);
        });
    });

    renderLeaderboard(activeDataset);
    renderReferences();
});


