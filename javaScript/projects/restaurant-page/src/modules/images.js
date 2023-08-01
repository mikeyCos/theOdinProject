// https://webpack.js.org/guides/dependency-management/
// imports all images
// returns an object and array of images
export default function importAll(r) {
    let images = {};
    let imagesArr = []
    r.keys().map(item => {
        images[item.replace('./', '')] = r(item);
        imagesArr.push(item.replace('./', ''));
    });
    return { images, imagesArr };
}