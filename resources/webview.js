import './app';

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

// Set initial state
window.setInitialState = function (state) {
 // This should work - but it doesn't
 // window.appComponent.loadInitialState(JSON.parse(state));
}
