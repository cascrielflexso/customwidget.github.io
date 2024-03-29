(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Colored Box Properties</legend>
				<table>
					<tr>
						<td>c</td>
						<td><input id="builder_color" type="text" size="40" maxlength="40"></td>
					</tr>
					<tr>
						<td>Product</td>
						<td><input id="builder_product" type="text" size="40" maxlength="40"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
	`;
	
	class ColoredBoxBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color,
							prod_number : this.prod_number
						}
					}
			}));
		}

		set color(newColor) {
			this._shadowRoot.getElementById("builder_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("builder_color").value;
		}
	
		
		set prod_number(newProd_number) {
			this._shadowRoot.getElementById("builder_product").value = newProd_number;
		}

		get color() {
			return this._shadowRoot.getElementById("builder_product").value;
		}
	}

	customElements.define("builder-custom-panel", ColoredBoxBuilderPanel);
})();
