// Validate form submissions on both register.html and order.html
function validate() {
	// ----------------------------
	// Validation for register.html
	// ----------------------------
	if (document.getElementById("username")) {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var firstname = document.getElementById("firstname").value;
		var email = document.getElementById("email").value;
		var genm = document.getElementById("male").checked;
		var genf = document.getElementById("female").checked;
		var geno = document.getElementById("other").checked;

		var errMsg = "";
		var result = true;
		var pattern = /^[a-zA-Z ]+$/; // Letters and spaces only

		// Validate each input field
		if (username == "") errMsg += "Username cannot be empty.\n";
		if (password == "") {
			errMsg += "Password cannot be empty.\n";
		} else if (password.length < 9) {
			errMsg += "Password must be at least 9 characters long.\n";
		}
		if (firstname == "") errMsg += "First name cannot be empty.\n";
		if (!genm && !genf && !geno) errMsg += "A gender must be selected.\n";
		if (email == "") {
			errMsg += "Email cannot be empty.\n";
		} else {
			if (email.indexOf('@') == 0) errMsg += "Email cannot start with an @ symbol.\n";
			if (email.indexOf('@') < 0) errMsg += "Email must contain an @ symbol.\n";
		}
		if (!firstname.match(pattern)) {
			errMsg += "First name must contain only letters and spaces.\n";
		}

		// Show errors if any
		if (errMsg != "") {
			alert(errMsg);
			result = false;
		}
		return result;

	// ----------------------------
	// Validation for order.html
	// ----------------------------
	} else if (document.getElementById("deladdress")) {
		var delivery = document.getElementById("delivery")?.checked;
		var pickup = document.getElementById("pickup")?.checked;
		var deladdress = document.getElementById("deladdress").value;
		var biladdress = document.getElementById("biladdress").value;
		var postcode = document.getElementById("postcode").value;

		var phonenum = document.getElementById("phonenum").value;
		var email = document.getElementById("email").value;

		var payOnline = document.getElementById("online")?.checked;
		var payPickup = document.getElementById("paypickup")?.checked;

		var cardType = document.getElementById("cardtype").value;
		var cardnum = document.getElementById("cardnum").value;
		var exp = document.getElementById("exp").value;
		var cvc = document.getElementById("cvc").value;

		var errMsg = "";
		var result = true;
		var phonePattern = /^[0-9]{8,15}$/; // Validates 8-15 digits
		var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
		var expPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
		var cvcPattern = /^\d{3}$/; // CVC = 3 digits

		// Delivery/pickup validation
		if (!delivery && !pickup) errMsg += "Delivery or Pickup must be selected.\n";
		if (delivery && deladdress == "") errMsg += "Delivery address cannot be empty.\n";
		if (biladdress == "") errMsg += "Billing address cannot be empty.\n";

		// Phone number validation
		if (phonenum == "") {
			errMsg += "Phone number cannot be empty.\n";
		} else if (!phonenum.match(phonePattern)) {
			errMsg += "Phone number must be 8 to 15 digits.\n";
		}

		// Email validation
		if (email == "") {
			errMsg += "Email cannot be empty.\n";
		} else if (!email.match(emailPattern)) {
			errMsg += "Email format is invalid.\n";
		}

		// Payment method check
		if (!payOnline && !payPickup) {
			errMsg += "A payment method must be selected.\n";
		}

		// Online payment field validation
		if (payOnline) {
			if (cardType == "") {
				errMsg += "Please select a credit card type.\n";
			}

			if (cardnum == "") {
				errMsg += "Card number cannot be empty.\n";
			} else {
				if (cardType === "visa" || cardType === "mastercard") {
					if (!/^\d{16}$/.test(cardnum)) {
						errMsg += "Visa and MasterCard must have exactly 16 digits.\n";
					}
				} else if (cardType === "amex") {
					if (!/^\d{15}$/.test(cardnum)) {
						errMsg += "American Express must have exactly 15 digits.\n";
					}
				}
			}

			if (exp == "") {
				errMsg += "Expiry date cannot be empty.\n";
			} else if (!exp.match(expPattern)) {
				errMsg += "Expiry must be in MM/YY format.\n";
			}

			if (cvc == "") {
				errMsg += "CVC cannot be empty.\n";
			} else if (!cvc.match(cvcPattern)) {
				errMsg += "CVC must be exactly 3 digits.\n";
			}
		}

		// Postcode validation
		if (postcode == "") {
			errMsg += "Postcode cannot be empty when delivery is selected.\n";
		} else if (!/^\d{4}$/.test(postcode)) {
			errMsg += "Postcode must be 4 digits.\n";
		}

		// Show error messages
		if (errMsg != "") {
			alert(errMsg);
			result = false;
		}
		return result;
	}

	// Default fallback – allow submission if page is unrecognized
	return true;
}

// Toggles visibility of sections based on form interaction (order.html only)
function toggleSections() {
	// Check if page is order.html
	if (document.getElementById("deladdress")) {
		// Delivery and pickup radio elements
		var deliveryRadio = document.getElementById("delivery");
		var pickupRadio = document.getElementById("pickup");
		var deliverySection = document.getElementById("deliverysection");
		var bsamedSection = document.getElementById("bsamedsection");

		// Toggle delivery address section based on radio selection
		deliveryRadio.addEventListener("change", function () {
			deliverysection.style.display = this.checked ? "block" : "none";
			bsamedsection.style.display = this.checked ? "block" : "none";
		});
		pickupRadio.addEventListener("change", function () {
			deliverysection.style.display = deliveryRadio.checked ? "block" : "none";
			bsamedsection.style.display = deliveryRadio.checked ? "block" : "none";
		});

		// Billing same as delivery checkbox logic
		var bsamed = document.getElementById("bsamed");
		var deladdress = document.getElementById("deladdress");
		var biladdress = document.getElementById("biladdress");

		bsamed.addEventListener("change", function () {
			if (this.checked) {
				if (deladdress.value.trim() === "") {
					alert("Please enter a delivery address before selecting this option.");
					this.checked = false;
				} else {
					biladdress.value = deladdress.value;
				}
			}
		});

		// Online payment toggle
		var payOnline = document.getElementById("online");
		var payPickup = document.getElementById("paypickup");
		var cardsection = document.getElementById("cardsection");

		// Show/hide credit card section based on selection
		payOnline.addEventListener("change", function () {
			cardsection.style.display = this.checked ? "block" : "none";
		});
		payPickup.addEventListener("change", function () {
			cardsection.style.display = payOnline.checked ? "block" : "none";
		});

		// Set initial visibility when page loads
		cardsection.style.display = payOnline.checked ? "block" : "none";
		deliverysection.style.display = deliveryRadio.checked ? "block" : "none";
	}
}

// Initialization when window loads
function init() {
	var forms = document.forms;
	for (var i = 0; i < forms.length; i++) {
		forms[i].onsubmit = validate; // Attach validation on submit
	}
	toggleSections(); // Setup section toggles
}

// Run init when page fully loads
window.onload = init;