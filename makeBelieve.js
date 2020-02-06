(function (global0bj) {
    // Setup MakeBelieveJS
    
    // MakeBelieveElement constructor function  
    function MakeBelieveElement(nodes) {
        // this means this instance of MakeBelieveElement
        this.nodes = nodes;
    }

    MakeBelieveElement.prototype.getLength = function() {
        return this.nodes.length; 
    };

    MakeBelieveElement.prototype.getTagNames = function() {
        var tagNames = [];
        for (var i= 0; i < this.nodes.length; i++) {
            var currentElement = this.nodes[i];
            tagNames.push(currentElement.tagName.toLowerCase());
        }
        return tagNames;
    };

    // 4 //
    MakeBelieveElement.prototype.parent = function(element) {
        var parents = [];

        for (var i = 0; i < this.nodes.length; i++) {
            if (element){
                if (this.nodes[i].parentNode.matches(element)) {
                    parents.push(this.nodes[i].parentNode)
                }
            }   
            else { 
                parents.push(this.nodes[i].parentNode)
            }
        }
        return parents;
    };

    // 5 //
    MakeBelieveElement.prototype.grandParent = function(element) {
        var grandParents = [];
        
        for (var i = 0; i < this.nodes.length; i++) {
            if (element){
                if (this.nodes[i].parentNode.parentNode.matches(element)) {
                    grandParents.push(this.nodes[i].parentNode.parentNode)
                }
            }   
            else { 
                grandParents.push(this.nodes[i].parentNode.parentNode)
            }
        }
        return grandParents;
    };

    // 6 //
    MakeBelieveElement.prototype.ancestor = function (selector) {
        var findSelector = document.querySelector(selector)
        var parentItem
        var ancestor
        for (let item of this.nodes) {
            parentItem = item.parentElement
            while (parentItem !== null) {
                if (parentItem == findSelector) {
                    ancestor = parentItem
                }
                if (parentItem.parentElement === null) {
                    parentItem = null;
                }
                else {
                    parentItem = parentItem.parentElement
                }
            }
        }
        return ancestor
    };

    // 7 //
    MakeBelieveElement.prototype.onClick = function(evt){
        for (var i = 0; i < this.nodes.length; i++){
            this.nodes[i].addEventListener("click", evt)
        }
    }

    // 8 //
    MakeBelieveElement.prototype.insertText = function(text){
        for (var i = 0; i < this.nodes.length; i++){
            this.nodes[i].innerHTML = text
            console.log(this.nodes)
        }
    }

    // 9 //
    MakeBelieveElement.prototype.append = function(elem){

        if (typeof (elem) == "object") {
            this.nodes[0].appendChild(elem.parentNode)
        }
        else {
            this.nodes[0].innerHTML = this.nodes[0].innerHTML + elem
        }
    };

    // MakeBelieveElement.prototype.append = function(elem){
    //     var newElem;
    //     if (typeof elem == "string"){
    //         var elemType = elem.match(/<(.*?)>/)[0];
    //         var stripedHtml = elem.replace(/<[^>]+>/g, '');
    //         newElem = document.createElement(elemType[1]);
    //         newElem.appendChild(document.createTextNode(stripedHtml));
    //     } else{
    //         newElem = elem.parentNode
    //     }
    //     this.nodes[0].appendChild(newElem)
    // }

    10 //
    MakeBelieveElement.prototype.prepend = function (elem){

        if (typeof (elem) == "object") {
            this.nodes[0].insertBefore(elem.parentNode, this.nodes[0].childNodes[0])
        }
        else {
            this.nodes[0].innerHTML = elem + this.nodes[0].innerHTML
        }
    };
    
    // MakeBelieveElement.prototype.prepend = function(elem){
    //     var newElem;
    //     if (typeof elem == "string"){
    //         var elemType = elem.match(/<(.*?)>/)[1];
    //         var stripedHtml = elem.replace(/<[^>]+>/g, '');
    //         newElem = document.createElement(elemType);
    //         newElem.appendChild(document.createTextNode(stripedHtml));
    //     } else{
    //         newElem = elem.parentNode
    //     }
    //     this.nodes[0].parentNode.insertBefore(newElem, this.nodes[0])
        
    // }

    // 11 //
    MakeBelieveElement.prototype.delete = function(){
        for (var i = 0; i < this.nodes.length; i++){
            this.nodes[i].remove()
        }
    }

    // 12 //
    MakeBelieveElement.prototype.ajax = function( configuration ) {
        
        var http_method = 'GET'; // Defaults to GET
        
        var XMLHrequest = new XMLHttpRequest();

        if ( configuration.http_method == true ) {
            // console.log('IS TRUE');
            http_method = configuration.http_method;
        }

        XMLHrequest.open( http_method, configuration.url );

        //Hérna er configuration requestið okkar fyrir request.header
        if ( configuration.headers == true ) {
            
            for (var i = 0; i < configuration.headers.lenght; i++ ) {

                XMLHrequest.setRequestHeader( configuration.headers[i][0], configuration.headers[i][1] );
            }
        }

        if ( configuration.data  == true ) {

            XMLHrequest.send(configuration.data);
        }

        if ( configuration.timeout  == true) {

            XMLHrequest.timeout = configuration.timeout;
        } 
        else { XMLHrequest.send(); }

        XMLHrequest.onreadystatechange = function() {

            if ( XMLHrequest.status == 200 && configuration.success && XMLHrequest.readyState == XMLHttpRequest.DONE ) {
                //console.log('Status = 200');
                configuration.success( XMLHrequest.response );
            }

            else if ( XMLHrequest.status != 200 && XMLHrequest.readyState == XMLHttpRequest.DONE && configuration.fail ) {
                
                configuration.fail( XMLHrequest.response );
            }

            else if( XMLHrequest.readyState == XMLHttpRequest.HEADERS_RECEIVED && configuration.beforeSend ) {
                
                configuration.beforeSend( XMLHrequest.response );
            }
        }

        return this;
    }



    // 13 // 
    MakeBelieveElement.prototype.css = function( nafn, nytt ){
        
        for ( var i = 0; i < this.nodes.length; i++ ) {
            this.nodes[i].style = nafn + ': ' + nytt +';';
        }
        
        return this;
    }
    
    // 14 //
    MakeBelieveElement.prototype.toggleClass = function(c){
        var toggledClasses = this.nodes[0].classList.value.split(' ')
        this.nodes[0].classList.value = ''
        var found = false
        for (let i=0; i< toggledClasses.length; i++){
            if (!(toggledClasses[i] == c)){
                this.nodes[0].classList.add(toggledClasses[i])
            } else{
                found = true
            }
        }
        if (found == false){
            this.nodes[0].classList.add(c)
        }
        return this.nodes[0]
    }

    // 15 //
    MakeBelieveElement.prototype.onSubmit = function (evt){
        console.log(this.nodes[0])
        this.nodes[0].addEventListener("submit", evt)
    }

    // 16 //
    MakeBelieveElement.prototype.onInput = function (evt){
        for (var i = 0; i < this.nodes.length; i++){
            this.nodes[i].addEventListener("input", evt)
        }
        console.log(evt.data)
    }


    function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    };

    global0bj.__ = query


})(window);

//console.log(window);

var paragraphs = __('p');
var divs = __('.item');

console.log("length")
console.log(paragraphs.getLength());
console.log(divs.getLength());

var parent = __('#password').parent();
var formParent = __('#password').parent('form');
console.log("parents")
console.log(parent);
console.log(formParent);

var paragraphsParent = paragraphs.parent();
var paragraphsGrandParent = paragraphs.grandParent();
var paragraphsAncestor = paragraphs.ancestor('.ancestor');
var onInput = __('#my-form').onInput(function(evt){
    evt.preventDefault();
    console.log(evt.target.value)
});
var onSubmit = __('#my-form').onSubmit(function(evt){
    evt.preventDefault();
    console.log('username:', evt.target.username.value, ' ', 'password:', evt.target.password.value)
});
console.log(paragraphs.getLength());
console.log(divs.getLength());
console.log(paragraphs.getTagNames());
console.log(divs.getTagNames());
console.log(parent);
console.log(formParent);
console.log("parents of p");
console.log(paragraphsParent);
console.log("grandparent of p")
console.log(paragraphsGrandParent);
console.log("ancestor of p")
console.log(paragraphsAncestor);

console.log("paragraph tagnames")
console.log(paragraphs.getTagNames());
console.log("div tagnames")
console.log(divs.getTagNames());


console.log(__('#paragraph-1').ancestor('.ancestor'))
__('.top').onClick(function(evt){
    console.log(evt)
})

__('.parent').insertText('hallo');

__('.the-prepender').prepend('<p>I am an prepended paragraph</p>')
__('.the-prepender').prepend('<p>again</p>')
__('.the-prepender').prepend('<h2>again</h2>')
__('.the-prepender').prepend('<h2></h2>')
__('.the-prepender').prepend(document.createElement('p')
            .appendChild(
                document.createTextNode('bla')
                ))
__('.the-appender').append('<p>I am an appended paragraph!</p>')
__('.the-appender').append(
    document.createElement('p')
        .appendChild(
            document.createTextNode('I am an appended paragraph!')
        )
)
__('.some-div h2').delete()

// testing 12 //

__().ajax( 
    {
        url:'https://serene-island-81305.herokuapp.com/api/200',
        method: 'POST',
        
        
        success: function(resp) {
            console.log('SUCCESS');
            console.log(resp);
        },
        fail: function(error) {
            console.log('FAIL');
            console.log(error);
        },
        beforeSend: function(xhr) {
            console.log(xhr);
        }
});  

// testing 13 //
__('.the-prepender').css('background-color', 'green');


// console.log(document)
console.log(__('.some-div').toggleClass('other-class'))
console.log(__('#something'));

