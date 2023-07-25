
const QuotationPdf=(props)=>{
        console.log(props);
        return `
        <!DOCTYPE html>
        <html><head>
        <style>
                tr{
                        text-align: center;
                }
                td{
                        border: 1px solid black;
                }
        </style>
        </head>
        <body style="font-size:30px;border:1px solid grey;padding: 10px;">
        <h1 style="text-align:left;">VELMEN<sub style="font-size:15px;">ENGINEERS</sub></h1>
        <hr/>
        <h5>Invoice No.: ${props._id}</h5>
        <table width="100%" id="myTable">
                <thead style="background-color:lightseagreen"><tr><th>ID</th><th colspan="4">Description</th><th>Quantity</th><th width="100px">Price Per Unit</th><th>Total Price</th></tr></thead>
                <tbody>
                        <tr style="text-align: center;"><td style="border:none;"></td><td>Type</td><td>Diameter</td><td>Length</td><td>Total Length</td></tr>
                        <tr id="after" style="text-align: center;"><td colspan="4"><b>Total Quantity:</b></td><td id="qty"></td><td colspan="2"><b>Total :</b></td><td id="totalAmount">${props.totalAmount}</td></tr>
                        <tr><td colspan="6"><b>Total Amount</b><br/><span style="font-size: 20px;">(After inclusion of 18% GST)</span></td><td colspan="3" id="gst">${props.grandTotal}<b></b></td></tr>
                </tbody>
        </table>

        <script>
                function data(){
                        var tableBody = document.querySelector('#myTable tbody');
                        const end = document.querySelector('#after');
                        props.items.forEach((ele, i) => {
                                const row = document.createElement('tr');
                                row.innerHTML =
                                '<td>' + (i + 1) + '</td>' +
                                '<td>${ele.type}</td>' +
                                '<td>' + ele.diameter + '</td>' +
                                '<td>' + ele.length + '</td>' +
                                '<td>' + ele.total + '</td>' +
                                '<td>' + ele.q + '</td>' +
                                '<td style="width:10px">' + ele.price + '</td>' +
                                '<td>' + ele.totalPrice + '</td>'+
                                '<td>Hello</td>';
                                tableBody.insertBefore(row, end);
                        })
                }
                document.addEventListener("DOMContentLoaded", function() {

                data();

                //display total quantity
                var totalQty=document.getElementById("qty");
                var sum=0;
                props.items.forEach((ele)=>{
                  sum+=ele.q
                })
                totalQty.innerHTML=sum;
        
        })
        </script>
        </body></html>
        `;
}

module.exports=QuotationPdf