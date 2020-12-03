/**
 * module
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

import { coreInstance } from "../../core/Core";
import settings from "./settings.json";
export class Module {

	private configuration: SettingsModuleDT;
	constructor () {
		console.log("* Module TicM Services Instantiated at " + new Date().toLocaleString() + " *");
	}
	async init(user: SettingsUserDT) {
		this.configuration = JSON.parse(JSON.stringify(settings));

		const assetStorage: ResponseDT = await coreInstance.service.assetStorage.init(this.configuration);
		if (!assetStorage.status) {
			console.error(`Error: init module. Module: ${this.configuration.name} Message: ${assetStorage.message}`);
		}


		for (const i in this.configuration.language) {
			const lang = await require("./language/" + i + ".json");
			this.configuration.language[i] = lang;
		}
	}
	public getSettings() {
		return this.configuration;
	}
}
