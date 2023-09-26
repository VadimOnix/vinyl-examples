import {defaultEnvs} from "@/configs/defaultEnvs";

export const ENV = (envKey: keyof typeof defaultEnvs): string => {
  return process.env[envKey] ?? defaultEnvs[envKey];
}
