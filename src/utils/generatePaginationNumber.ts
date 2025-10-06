// [1,2,3,4,5,...,7]

export const generatePaginationNumbers = (currentPage:number, totalPages: number ) => {
    // Si en numero total de paginas es 7 o menos vamos a mostar todas las paginas sin los puntos suspensivos
    if(totalPages <= 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1)
    }
    // Si la pagina actual esta entre las primeras 3 paginas, mostrar las primeras 3, puntos suspensivos y las ultimas 2
    if(currentPage <= 3){
        return [1,2,3,'...', totalPages -1, totalPages] //[1,2,3,'...', 49, 50]
    }
    // Si la pagina actual esta entre las ultimas 3 paginas, mostrar las primeras 2, puntos suspensivos y las ultimas 3
    if(currentPage >= totalPages -2){
        return [1,2,'...', totalPages -2, totalPages -1, totalPages] //[1,2,'...', 48, 49, 50]
    }
    // Si la pagina actual esta en el medio, mostrar las primera pagina, puntos suspensivos, la pagina actual y vecinos
    return [1,'...', currentPage -1, currentPage, currentPage +1, '...', totalPages] 
}