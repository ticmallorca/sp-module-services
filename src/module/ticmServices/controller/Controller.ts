/**
 * Controller
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

import { coreInstance } from "../../../core/Core";
import { Request, Response } from "express";
import { AssetOriginEnumDT } from "../../../types/AssetOriginEnum";

class Controller {

	private configuration: SettingsModuleDT;
	constructor () {

		// Module settings
		this.configuration = require("../settings.json");
	}

	/**
	 * getAssets
	 * @description Search all assets filtered by parameters
	 * @param { number } entityId
	 * @param { number } userId
	 * @param { string } section
	 * @param { boolean } shared
	 * @returns { ResponseDT } Object
	 */
	async getAssets(entityId: number, userId: number, section: string, shared: boolean): Promise<ResponseDT> {


		// Get module object
		const moduleResponse: ResponseDT = await coreInstance.entity.module.getModuleByName(this.configuration.name);
		if (!moduleResponse.status || moduleResponse.size !== 1) {
			moduleResponse.message = `[ERROR] ticmServices: getAssets(): Module not exist or there're more than one modules with same name. ${moduleResponse.message}`;
			return moduleResponse;
		}
		const moduleId = moduleResponse.data[0].id;

		const assetResponse: ResponseDT = await coreInstance.entity.asset.getByFilter(moduleId, entityId, userId, shared);
		if (!assetResponse.status || assetResponse.size === 0) {
			moduleResponse.message = `[ERROR] ticmServices: getAssets(): Module hasn't files. ${moduleResponse.message}`;
			return moduleResponse;
		}

		const assets = [];
		for (const element in assetResponse.data) {
			try {
				const assetSection = JSON.parse(assetResponse.data[element].category);
				if (assetSection.hasOwnProperty("section") && assetSection.section === section) {
					assets.push(assetResponse.data[element]);
				}
			} catch (error) { }
		}
		assetResponse.data = assets;
		assetResponse.size = assetResponse.data.length;
		return assetResponse;
	}


	// /**
	//  * getAssetFile
	//  * @description Return the asset file
	//  * @param { Request } req
	//  * @returns { ResponseDT } Object
	//  */
	// async getAssetFile(req: Request, pathFile: string): Promise<ResponseDT> {


	// 	// Get module object
	// 	const moduleResponse: ResponseDT = await coreInstance.entity.module.getModuleByName(this.configuration.name);
	// 	if (!moduleResponse.status || moduleResponse.size !== 1) {
	// 		moduleResponse.message = `[ERROR] ticmServices: getAssets(): Module not exist or there're more than one modules with same name. ${moduleResponse.message}`;
	// 		return moduleResponse;
	// 	}
	// 	const moduleId = moduleResponse.data[0].id;

	// 	const assetResponse: ResponseDT = await coreInstance.entity.asset.getFile(req.session.data.user.entitySelected, moduleId, req.session.data.user.profile.id, pathFile);
	// 	if (!assetResponse.status || assetResponse.size === 0) {
	// 		moduleResponse.message = `[ERROR] ticmServices: getAssets(): Module hasn't files. ${moduleResponse.message}`;
	// 		return moduleResponse;
	// 	}

	// 	return assetResponse;
	// }


	/**
	 * uploadSingleAsset
	 * @description
	 * @param { Request } req
	 * @param { Response } res
	 * @param { string } field
	 * @returns { ResponseDT } Object
	 */
	async uploadSingleAsset(req: Request, res: Response, field: string): Promise<ResponseDT> {

		const fileInstance: ResponseDT = await coreInstance.service.assetStorage.init(this.configuration);
		if (!fileInstance.status) {
			fileInstance.message = `[ERROR] ticmServices: Controller: uploadSingleAsset: Init assetStorageInstance: ${fileInstance.message}`;
			return fileInstance;
		}

		const storageFile: ResponseDT = await coreInstance.service.assetStorage.saveSingleFile(this.configuration, req, res, field, AssetOriginEnumDT.UPLOAD);
		if (!storageFile.status) {
			storageFile.message = `[ERROR] ticmServices: Controller: uploadSingleAsset: Saving single file: ${storageFile.message}`;
		}
		return storageFile;

	}

}

export let controllerInstance = new Controller();
