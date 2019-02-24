import './app';

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

// Set initial state
window.setInitialState = function (state) {
 const test = state;
 // This should work
 //  window.appComponent.loadInitialState(JSON.parse(state));
}
