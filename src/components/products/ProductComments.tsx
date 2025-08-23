import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageCircle, Send, ThumbsUp, ThumbsDown } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface ProductCommentsProps {
  productId: string;
  productName: string;
}

// Comentarios mockup para demostración
const mockComments: Comment[] = [
  {
    id: "1",
    author: "María González",
    avatar: "/assets/avatar1.jpg",
    rating: 5,
    content: "Excelente producto, muy buena calidad y precio. Lo recomiendo totalmente.",
    date: "2024-01-15",
    likes: 12,
    dislikes: 0,
    replies: [
      {
        id: "1-1",
        author: "Juan Pérez",
        avatar: "/assets/avatar2.jpg",
        rating: 5,
        content: "Estoy de acuerdo, es muy bueno.",
        date: "2024-01-16",
        likes: 3,
        dislikes: 0,
      }
    ]
  },
  {
    id: "2",
    author: "Carlos Rodríguez",
    avatar: "/assets/avatar3.jpg",
    rating: 4,
    content: "Buen producto, cumple con lo esperado. La entrega fue rápida.",
    date: "2024-01-14",
    likes: 8,
    dislikes: 1,
  },
  {
    id: "3",
    author: "Ana Martínez",
    avatar: "/assets/avatar4.jpg",
    rating: 5,
    content: "Superó mis expectativas. Muy satisfecha con la compra.",
    date: "2024-01-13",
    likes: 15,
    dislikes: 0,
  }
];

export function ProductComments({ productId, productName }: ProductCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Usuario Actual",
      rating,
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setRating(5);
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: "Usuario Actual",
      rating: 5,
      content: replyContent,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0,
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));

    setReplyContent("");
    setShowReplyForm(null);
  };

  const handleLike = (commentId: string, isLike: boolean) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: isLike ? comment.likes + 1 : comment.likes,
          dislikes: !isLike ? comment.dislikes + 1 : comment.dislikes,
        };
      }
      return comment;
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <Card key={comment.id} className={isReply ? "ml-8 border-l-2 border-blue-200" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.avatar} />
            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-slate-900">{comment.author}</span>
              <div className="flex items-center gap-1">
                {renderStars(comment.rating)}
              </div>
              <span className="text-sm text-slate-500">{comment.date}</span>
            </div>
            
            <p className="text-slate-700 mb-3">{comment.content}</p>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(comment.id, true)}
                className="flex items-center gap-1 text-slate-600 hover:text-green-600"
              >
                <ThumbsUp className="h-4 w-4" />
                {comment.likes}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(comment.id, false)}
                className="flex items-center gap-1 text-slate-600 hover:text-red-600"
              >
                <ThumbsDown className="h-4 w-4" />
                {comment.dislikes}
              </Button>
              
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Responder
                </Button>
              )}
            </div>
            
            {/* Formulario de respuesta */}
            {showReplyForm === comment.id && !isReply && (
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <Textarea
                  placeholder="Escribe tu respuesta..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim()}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Responder
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReplyForm(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
            
            {/* Respuestas */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 space-y-3">
                {comment.replies.map(reply => renderComment(reply, true))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            Comentarios y Reseñas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formulario para nuevo comentario */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-3">Deja tu comentario</h4>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-slate-600">Calificación:</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-5 w-5 cursor-pointer ${
                        i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <Textarea
              placeholder={`Comparte tu experiencia con ${productName}...`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3"
              rows={3}
            />
            
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="w-full sm:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              Publicar Comentario
            </Button>
          </div>

          {/* Lista de comentarios */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map(comment => renderComment(comment))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
