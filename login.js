function test {
    console.log("test");
}

function main() {
    $("loginbutton").click(test);
  }
  
  $(document).ready(main);