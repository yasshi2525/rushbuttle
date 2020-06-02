import { Container, Scene, ServiceAdapter } from "../adapters/adapter";

import ModelBinder from "./model_binder";
import Station from "../models/station";
import Train from "../models/train";

export type CreateRailwayViewerOption<T, C> = {
  adapter: ServiceAdapter<T, C>;
  scene: Scene<T, C>;
};

export const createRailwayPanel = <T, C>(
  opts: CreateRailwayViewerOption<T, C>
): Container<T, C> => {
  const panel = opts.adapter.createContainer({ scene: opts.scene });
  new ModelBinder<T, C, Station>({
    adapter: opts.adapter,
    scene: opts.scene,
    panel,

    creator: (scene) =>
      opts.adapter.createRectangle({
        scene,
        color: "#0000ff",
        width: 50,
        height: 50,
      }),
    bind: Station,
    modifier: {},
  });
  new ModelBinder<T, C, Train>({
    adapter: opts.adapter,
    scene: opts.scene,
    panel,

    creator: (scene) =>
      opts.adapter.createRectangle({
        scene,
        color: "#00ff00",
        width: 80,
        height: 10,
      }),
    bind: Train,
    modifier: {},
  });
  return panel;
};
