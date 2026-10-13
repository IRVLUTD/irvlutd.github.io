const projectName = 'Cross-Embodiment Robot Manipulation via a Unified Hand Action Space';

document.addEventListener('DOMContentLoaded', function () {
	const today = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	}).replace(',', '');

	document.getElementById('meta-desc')?.setAttribute('content', projectName);
	document.getElementById('title').textContent = projectName;
	document.getElementById('project-name').textContent = projectName;

	document.body.insertAdjacentHTML('beforeend', `
 <footer class="footer">
 <div class="container">
 <div class="content has-text-centered">
 <p id="website-template-credits">
 Last updated on: <span id="last-updated">${today}</span> | Page template adapted from <a target="_blank" href="https://nerfies.github.io"><span class="small-caps black-font">Nerfies</span></a>.</p>
 </div>
 </div>
 </footer>`);
});
