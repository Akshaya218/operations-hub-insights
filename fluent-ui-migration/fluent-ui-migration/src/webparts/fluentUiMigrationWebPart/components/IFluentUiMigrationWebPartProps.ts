import { type IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IFluentUiMigrationWebPartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  themeVariant?: IReadonlyTheme; // Added themeVariant prop
}
