export const IsDesktopMode = (page) => {
    let varViewPort = page.viewportSize();
    return varViewPort.width >= 800;
}