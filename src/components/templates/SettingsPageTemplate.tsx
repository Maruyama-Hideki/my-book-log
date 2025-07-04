import { SettingsForm } from "@/components/organisms/settings-form";
import { Header } from "@/components/organisms/header";

export const SettingsPageTemplate = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <SettingsForm />
    </div>
  );
};
