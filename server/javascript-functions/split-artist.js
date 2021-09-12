const splitArtist = (artistData, separator = ',') => {
    return artistData.split(separator);
}

module.exports = splitArtist;