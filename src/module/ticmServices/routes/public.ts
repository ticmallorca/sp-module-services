/**
 * public
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
import { Request, Response, Router } from "express";
const api: Router = Router();
import { settingsInstance } from "../../../core/Settings";

api.get("/training", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "ticmServices - Training Section");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmServices",
		component: "training"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

api.get("/municipal-management", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "ticmServices - Municipal Management Section");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmServices",
		component: "municipal-management"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

api.get("/scm", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "ticmServices - SCM Section");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmServices",
		component: "scm"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

api.get("/mapping/eiel-management", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "ticmServices - Mapping Section - EIEL");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmServices",
		component: "mapping-eiel-management"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});
api.get("/mapping/info", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "ticmServices - Mapping Section");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmServices",
		component: "mapping-info"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

api.get("/web", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "ticmServices - Web Section");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmServices",
		component: "web"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

export const ticmServicesController: Router = api;