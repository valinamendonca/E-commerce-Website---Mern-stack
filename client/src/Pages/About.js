import React from 'react'
import LogoutNavbar from '../Components/LogoutNavbar'
import LoggedinNavbar from '../Components/LoggedinNavbar'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function About() {
	const auth=localStorage.getItem("authenticated")
  return (
    <div>
        <Header/>{auth?(<LoggedinNavbar/>):(<LogoutNavbar/>)}
        <br/>
	<div style={{textAlign:"left"}} class="box-3">
		<p>A rubber roller is a machine part that is composed of an inner round shaft or tube covered by an outer layer of elastomer compounds. The inner shaft is made of steel, aluminum alloys, or other strong and rigid material composites. The outer layer, on the other hand, is typically fabricated from a polymer such as polyurethane, silicone, EPDM, neoprene, and natural and nitrile rubber.<br/><br/>Velmen Engineers is into production of Quality and Reliable Rubber Rollers since 1989. Rubber Rollers plays an important role in various applications of industrial use: </p>
		<ul><li>Printing</li>
			<li>Film Processing</li>
			<li>Material Conveying</li>
			<li>Squeezing and Wringing</li>
			<li>Straightening</li>
			<li>Cooling and Uncooling</li>
			<li>Laminating</li>
			<li>Straightening</li>
			<li>Deflecting</li>
			<li>Sanding (belt)</li>
			<li>Cutting (bandsaw)</li>
			<li>Coating</li>
			<li>Coiling/Uncoiling</li>
			<li>Tensioning</li>
			<p>...etc.</p>
		</ul>
		<p>Our Product caters mainly to the printing industry where it is converting thick printing ink into fine traces of ink which is coated into a cylinder which has got the impression of the printable product. Rollers grind and applies fine traces of ink to the impression cylinder of a printing machine. From there, it gets passed onto the paper or plastic film or clothing as a printed product.Printing machine needs mainly 3 types of rollers: rubber, copper, and chrome rollers. These products are produced in our premises to its maximum accuracy, durability and consistency. Our well qualified and experienced staff monitor them to its finest quality so that the customer get the final product to their best of satisfaction and worth. At the end, customer satisfaction is our only motto. We believe that our only communication with our customer is our product. </p>
		<p>We also design, replicate any roller excatly like the original one, which fits and function like the original product. Our rollers binds in modern machines like hidle berg, ofset machine of German, Komori Mitsubishi ofset machines of Japan, Rolland of USA, Solna of Yugoslavia etc. We also supplied rollers for plastic processing machinary, sheets printing in machines like retogravier, polylene plastic bag processing, texting dying, sizing, conveyor belts.</p>
	</div>
	<Footer/>
    </div>
  )
}

export default About