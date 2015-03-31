home = {

	element: "#content",
	template: "home",

	init: function() {

		//alert("inithome");
		var state = {
		  "thisIsOnPopState": true
		};
		history.pushState(state, "New Title", base_url + "#/home");
		expect(history.state).toEqual(state);
	}
};

