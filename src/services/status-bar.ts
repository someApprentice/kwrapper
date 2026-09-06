import { StatusBar, Style } from '@capacitor/status-bar';

export async function init() {
  const query = window.matchMedia('(prefers-color-scheme: dark)');

  if (!!query.matches) {
    await StatusBar.setStyle({
      style: Style.Dark
    });
  }

  query.addEventListener('change', async (event) => {
    await StatusBar.setStyle({
      style: event.matches ? Style.Dark : Style.Light
    });
  });

  await StatusBar.setStyle({
    style: Style.Default
  });
}
