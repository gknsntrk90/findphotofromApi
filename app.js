//*Önce id ve class'larımızı seçiyoruz
const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchBtton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

//*Function yazacağız
//*bu fonksyonumuz bizim event'larımızı çalıştıran fonksyon olacak bunun içine yazacağız
//*fonsyonu çalıştıralım hemen
runEventListeners();

function runEventListeners(){
    //*form'a event ekliyoruz
    form.addEventListener("submit", search); //*form biri sana submit yaparsa search adında ki metotda git diyorum
//*temizleme butonu oluşturuyoruz
    clearButton.addEventListener("click", clear);
}
//*clear metodunu çağıracağız
function clear(){
    //*searchInputu alıp içinde ki value alıp temizliyoruz yani yazdıklarımızı temizliyor
    searchInput.value="";
   //*açtığımız fotoğrafları temizleme ise;
   imageListWrapper.innerHTML="";
}


//*Şimdi ise search adında ki metodu tanımlayacağız
function search(e){
    //*değer tanımlıyoruz ve bu değeri searchInput'tan alıyoruz
    //*value'sunu trim olarak alıyoruz yani sağından solundan boşluk silerek
    const value = searchInput.value.trim();

    //*fetch api parantez içinde fotoğraf çekeceğimiz linki yazacağız
    //*ve daha sanra istek atacağız
    //* ? işareti atıyoruz parantez içindeki linkin sonuna parametre değeri için
    //* daha sonra soru işareti yanına query= yazıyoruz ${value} veriyoruz
    fetch(`https://api.unsplash.com/search/photo?query=${value}`),{
        //*metod da get isteğinde bulunuyoruz yani karşıdan alma
        method : "GET",
        headers : {    //*headers açıyoruz bir çok header olacağı için sitenin süslü parantez veriyoruz
            //*linkin içinde ki authorization bölümünden public authentication seçeceğiz
            //*sitede yazan Client-ID yazıp altında ki linkimiz yapıştırıyoruz buraya
            Authorization : "client-ID 1XhMrVSuGvElICKPe23UpwM-IglX9xIQRFRkeVCXv0U"
        }}
        //*Bu bize promise döndüğü için .then ve .catch ile yakalayacağız. res.json ile
        .then((res)=> res.json()) //*bir sonraki then'e atıp datayı yakalayacağız
        .then((data)=>{ //*burada datayı yakalamış oluyor
            //*array e çevireceğiz data.results olarak obje olduğu için
            //* çevirdiğimiz arrayı sonra forEach ile döneceğiz
            Array.from(data.results).forEach((image)=>{
                // console.log(image.urls.small)
                addImageToUI(image.urls.small)
            })
           
            })
           
         
        .catch((err)=>console.log(err));



    //*consoloa çıktımızı başarılı şekilde almak için
    e.preventDefaul();
}

//? örnek div oluşturacağız bunun gibi
/*
<div class="card">
    <img src="" alt="">
</div>
*/

//* yeni bir metot yazacağız
function addImageToUI(url){ //*url alıyoruz burada parametre olacak
    //* bir tane div oluşturcağız
    const div = document.createElement("div");
    //*div e class isimi vereceğiz
    div.className="card";

    //*image oluşturacağız
    const img = document.createElement("img");
    img.setAttribute("src",url); //*yaratığımız img ye setAttribute ile src,url olarak veriyoruz
    img.height='400'; //*yükseklik
    img.width='400';  //*genişlik


    //*img etiketni div'in içine koymalıyız bu tarz olaylarıda append ile yapıyoruz
    div.append(img);
    imageListWrapper.append(div); //*div elementinide classımız imagelistwrapper'e atıyoruz

}