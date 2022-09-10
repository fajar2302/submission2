const form = document.getElementById('book-form');
const searchingForm = document.getElementById('search-box');

const RENDER_EVENT = 'render-book';
const key_storage = 'Data-Buku';
const arraybooks = localStorage.getItem(key_storage) ? JSON.parse(localStorage.getItem(key_storage)) : [];


// tampil data
document.addEventListener("DOMContentLoaded", showBook);
document.addEventListener(RENDER_EVENT, loadBook);



// fungsi menampilkan buku
function showBook() {
    if (arraybooks == null) {
        arraybooks = [];
    } else {
        loadBook();

    }
}

function loadBook() {
    const read = document.getElementById('read');
    const unread = document.getElementById('unread');
    read.innerHTML = "";
    unread.innerHTML = "";
    arraybooks.forEach((item) => {
        if (item.cekBox == "true") {
            let el = `
                <tr class="listBuku">
                    <td>${item.judul}
                    <td>${item.penulis}</td>
                    <td>${item.tahun}</td>
                    <td class="button-table">
                        <a href="" onclick ="editBook(${item.id})"><i class="bi bi-pencil-square"></i></a>
                        <a href="" onclick ="removeBook(${item.id})"><i class="bi bi-trash-fill"></i></a>
                    </td>
                </tr>`;
            read.innerHTML += el;
        } else {
            let el = `
            <tr class="listBuku">
                <td>${item.judul}</td>
                <td>${item.penulis}</td>
                <td>${item.tahun}</td>
                <td class="button-table">
                    <a href="" onclick ="editBook(${item.id})"><i class="bi bi-pencil-square"></i></a>
                    <a href="" onclick ="removeBook(${item.id})"><i class="bi bi-trash-fill"></i></a>
                </td>
            </tr> `;
            unread.innerHTML += el;
        }
    });
}


//  fungsi generate id 
function generateId() {
    return +new Date();
}
// fungsi objek
function objekBuku(id, judul, penulis, tahun, cekBox) {
    return {
        id,
        judul,
        penulis,
        tahun,
        cekBox
    }
}

// funsi cek data 
function cekdata() {
    const sudahbaca = document.getElementById('IsRead');
    if (sudahbaca.checked) {
        return "true";
    }
    return "false";
}

// aksi form setelah ditekan submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    addBook();
});


// tambah buku
function addBook() {
    const judul = document.getElementById('book-title').value;
    const penulis = document.getElementById('author').value;
    const tahun = document.getElementById('year').value;
    const cekBox = cekdata();

    const id = generateId();
    const objekbuku = objekBuku(id, judul, penulis, tahun, cekBox);
    arraybooks.push(objekbuku);

    const simpan = JSON.stringify(arraybooks);
    localStorage.setItem(key_storage, simpan);
    document.dispatchEvent(new Event(RENDER_EVENT));
    alert('data berhasil ditambahkan');
    loadBook();
}

// fungsi untuk mengambil id
function findId(itemId) {
    for (const index in arraybooks) {
        if (arraybooks[index].id == itemId) {
            return index;
        }
    }
    return null;
}


// fungsi mengapus buku
function removeBook(itemId) {
    if (confirm('Apakah Anda Yakin ingin Menghapus buku ini?')) {
        for (const index in arraybooks) {
            if (arraybooks[index].id == itemId) {
                arraybooks.splice(index, 1)
            }
        }
        localStorage.setItem(key_storage, JSON.stringify(arraybooks));
    }
}

// ganti status buku
function editBook(itemId) {
    if (confirm('Apakah Anda Yakin Ingin Mengganti Status buku ini?')) {
        for (const index in arraybooks) {
            if (arraybooks[index].id == itemId) {
                if (arraybooks[index].cekBox === "false") {
                    arraybooks.splice(index, 1, {
                        id: arraybooks[index].id,
                        judul: arraybooks[index].judul,
                        penulis: arraybooks[index].penulis,
                        tahun: arraybooks[index].tahun,
                        cekBox: "true"
                    })
                } else {
                    arraybooks.splice(index, 1, {
                        id: arraybooks[index].id,
                        judul: arraybooks[index].judul,
                        penulis: arraybooks[index].penulis,
                        tahun: arraybooks[index].tahun,
                        cekBox: "false"
                    })
                }
            }
        }
        localStorage.setItem(key_storage, JSON.stringify(arraybooks));
    }
}


// form pencarian ketikan di submit
searchingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    pencarianBuku();
});

// fungsi pencarian
function pencarianBuku() {
    const inputSearch = document.getElementById('search-input');
    const filter = inputSearch.value.toLowerCase();
    const read = document.getElementById('read');
    const unread = document.getElementById('unread');
    read.innerHTML = "";
    unread.innerHTML = "";
    for (const book of arraybooks) {
        if (book.judul.toLowerCase().includes(filter)) {
            if (book.cekBox == "true") {
                let el = `
                    <tr class="listBuku">
                        <td>${book.judul}
                        <td>${book.penulis}</td>
                        <td>${book.tahun}</td>
                        <td class="button-table">
                            <a href="" onclick ="editBook(${book.id})"><i class="bi bi-pencil-square"></i></a>
                            <a href="" onclick ="removeBook(${book.id})"><i class="bi bi-trash-fill"></i></a>
                        </td>
                    </tr>`;
                read.innerHTML += el;
            } else {
                let el = `
                    <tr class="listBuku">
                        <td>${book.judul}
                        <td>${book.penulis}</td>
                        <td>${book.tahun}</td>
                        <td class="button-table">
                            <a href="" onclick ="editBook(${book.id})"><i class="bi bi-pencil-square"></i></a>
                            <a href="" onclick ="removeBook(${book.id})"><i class="bi bi-trash-fill"></i></a>
                        </td>
                    </tr>`;
                unread.innerHTML += el;
            }
        }
    }
}