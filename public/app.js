

// const dateFormatter = (input) => {
//     return moment(input).format('dddd, MMMM Do YYYY, kk:mm:ss')
// }

const addTag = () => {
    let tagInputDivision = $("#tag")
    tagInputDivision.append(
        '<div class="input-group mb-3 tag"><div class="input-group-prepend"><label for="tag" class="input-group-text" id="basic-addon3" style="width: 10rem;">#</label></div><input type="text" class="form-control" name="tag" placeholder="add a tag"><div class="input-group-append"><button class="btn btn-outline-secondary tagBtn" type="button" onclick="addTag()">+</button><button class="btn btn-outline-secondary removetagBtn" type="button" onclick= "removeTag(event)">-</button></div></div>'
        )
    // alert('test')
    return false
}
const removeTag = (event) => {
    let selectedTarget = event.currentTarget
    selectedTarget.closest('.tag').remove()
    return false
}

const commentUploadImg = () => {
    $('#commentImg').click();
}
$(() => {
    console.log('connected to jquery')

})