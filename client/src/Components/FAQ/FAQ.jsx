import React from 'react'
import './faq.css'
import img from './teblet.webp'

function FAQ() {
    return (
        <div className='faq-section'>
            <div className="faq-container">
                <div className="row g-4">
                    <div className=' col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                        <div className="faq-box">
                            <h2>FAQ (Frequently Asked Questions )</h2>
                            <div class="accordion accordion-flush" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            What is VEDA VITA Multi-Vitamins Tablet?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">VEDA VITA Multi-Vitamins Tablet is a dietary supplement formulated with essential vitamins, minerals, and antioxidants to support immune health, energy levels, and overall well-being.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            How does this tablet boost immunity?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">The tablet contains key immune-boosting nutrients like Vitamin C, Vitamin D, and Zinc, which play a crucial role in supporting the body’s defense mechanisms. Vitamin C acts as an antioxidant, Vitamin D supports immune cell function, and Zinc helps maintain the body’s immune response.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Who should take VEDA VITA Multi-Vitamins Tablet?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">This supplement is ideal for individuals looking to support their immune system, fill nutritional gaps in their diet, or enhance overall energy and vitality. However, it’s always recommended to consult with a healthcare professional before starting any supplement.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingFour">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                            How should I take this supplement?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">The general recommendation is to take one tablet daily with a meal. Always follow the specific dosage instructions on the packaging or as directed by your healthcare provider.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                        <div className="teblet-img">
                            <img src={img} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ
