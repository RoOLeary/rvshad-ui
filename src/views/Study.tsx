import { useParams } from 'react-router';

export const Study = () => {
    const { id } = useParams();
    return(
    <div className="flex flex-col w-full h-ful px-4">
       <div className="flex flex-col w-full h-screen">
            <h2 className='text-lg text-black font-black mb-2'>Study {id}</h2>
            <p className="text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, vel alias error quidem ex aut voluptas tempora delectus vitae cupiditate, accusamus unde sequi natus provident totam! Sapiente expedita et exercitationem adipisci cupiditate facere aperiam maiores numquam eaque nostrum excepturi minima ullam quod cumque harum fugit dolorem odit, libero aliquid illo quibusdam sint reiciendis animi aut? Rem tempore hic, corrupti velit accusamus dolorem voluptates molestias libero, quaerat aspernatur porro repudiandae dicta officiis! Temporibus adipisci nostrum laudantium vel, mollitia deleniti, ducimus corporis pariatur voluptate dignissimos neque veniam quibusdam dicta in vitae perspiciatis consectetur suscipit cupiditate. Voluptatibus eligendi ipsa ipsum ab laudantium saepe vero doloremque sequi repellendus dolorum quae, dolor ipsam! Laudantium voluptatum, vitae, fugiat nihil laborum placeat officia atque optio accusamus cum suscipit, vero maiores a! Explicabo, eius. Repellendus, rem! Accusantium omnis voluptates totam, soluta facere unde accusamus ex labore expedita sunt, laboriosam assumenda at beatae quaerat officiis consequuntur nesciunt, quia ipsum! Excepturi harum placeat cum, neque dicta unde ipsum aperiam ratione ad reprehenderit. Iure et possimus vel esse aspernatur facere quaerat eos aperiam exercitationem rem id qui, omnis quia minus? Perspiciatis, autem fuga! Quaerat recusandae ipsam quo hic repudiandae ut esse consequatur. Alias adipisci fuga id magnam vel nostrum fugit aspernatur.</p>
        </div>
    </div>
    )
};
  